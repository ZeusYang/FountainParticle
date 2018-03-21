#version 330 core
layout (points) in;
layout (points,max_vertices = 10) out;

in float Type0[];
in vec3 Position0[];
in vec3 Velocity0[];
in float Age0[];

out float Type1;
out vec3 Position1;
out vec3 Velocity1;
out float Age1;

uniform float gDeltaTimeMillis;//每帧时间变化量
uniform sampler1D gRandomTexture;
uniform float MAX_LAUNCH;
uniform float MIN_LAUNCH;
uniform float angle;
uniform float R;
uniform vec3 NORMAL;
uniform vec3 center;

#define PARTICLE_TYPE_LAUNCHER 0.0f
#define PARTICLE_TYPE_SHELL 1.0f
#define PARTICLE_TYPE_SECONDARY 2.0f

vec3 GetRandomDir(float TexCoord);
vec3 Rand(float TexCoord);
vec3 rand(float TexCoord);

void main()
{
    float Age = Age0[0] - gDeltaTimeMillis;
    float speedRate = 0.1f;
	if(Type0[0] == PARTICLE_TYPE_LAUNCHER){
        if(Age <= 0 ){
            //发射第二级粒子
            Type1 = PARTICLE_TYPE_SHELL;
            Position1 = Position0[0];
            vec3 randNum = rand((Age0[0]/1000.0f));
            vec3 rand01 = rand(Age0[0]+1);
            float Y = rand01.x*3.14159;
            float P = R*(angle*0.5);
            Velocity1 = (
                        vec3(
                        sin(P*randNum.x)*cos(Y),
                        0,
                        sin(P*randNum.z)*sin(Y)
                        ));
            Velocity1 = normalize(Velocity1);
            Velocity1.y = 12.0f;
            Velocity1.xz *= 5.0f;
            float dist = sqrt(pow(Position1.x-center.x,2)+pow(Position1.z-center.z,2));
            Velocity1.y += 2.0f*(1-pow(dist/R,2));

            Age1 = Age0[0];
            EmitVertex();
            EndPrimitive();
            Age = (MAX_LAUNCH-MIN_LAUNCH)*Rand(Age0[0]+2).z + MIN_LAUNCH;
        }
        Type1 = PARTICLE_TYPE_LAUNCHER;
        Position1 = Position0[0];
        Velocity1 = Velocity0[0];
        Age1 = Age;
        EmitVertex();
        EndPrimitive();
        return ;
    }
    else{
        float DeltaTimeSecs = gDeltaTimeMillis/1000.0f;
        vec3 DeltaV = DeltaTimeSecs*vec3(0.0,-9.81,0.0);
        vec3 DeltaP = Velocity0[0]*DeltaTimeSecs;
        if(Position0[0].y >= 6){
            Type1 = Type0[0];
            Position1 = Position0[0] + DeltaP;
            Velocity1 = Velocity0[0] + DeltaV;
            Age1 = Age;
            EmitVertex();
            EndPrimitive();
            return ;
        }
        else{
            if(Type0[0] == PARTICLE_TYPE_SECONDARY)return;
            Type1 = PARTICLE_TYPE_SECONDARY;
            Velocity1 = Velocity0[0] - 2*dot(Velocity0[0],NORMAL)*NORMAL;
            Velocity1 *= 0.2;
            Position1 = Position0[0];
            Position1.y = 6;
            Age1 = Age;
            EmitVertex();
            EndPrimitive();
            return ;
        }
    }
}

vec3 GetRandomDir(float TexCoord)
{
	vec3 Dir = texture(gRandomTexture,TexCoord).xyz;
	Dir -= vec3(0.5,0.5,0.5);
	return Dir;
}

vec3 Rand(float TexCoord){//随机0-1
    vec3 ret = texture(gRandomTexture,TexCoord).xyz;
    return ret; 
}

vec3 rand(float TexCoord){//随机-1 - 1
    vec3 ret = texture(gRandomTexture,TexCoord).xyz;
    ret -= vec3(0.5,0.5,0.5);
    return ret*2.0;
}
