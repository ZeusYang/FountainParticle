#version 330 

in vec3 pos;
out vec4 color;
uniform sampler2D water;

void main()
{
    vec4 texColor = texture(water,gl_PointCoord);
    if(texColor.r < 0.3)discard;
    //color = vec4(0.89f,0.09f,0.051f,texColor.a);
    color = vec4(1.00f,1.00f,1.00f,0.5);
}
