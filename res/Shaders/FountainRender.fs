#version 330 

out vec4 color;
uniform sampler2D water;

void main()
{
    vec4 texColor = texture(water,gl_PointCoord);
    if(texColor.r < 0.3)discard;
    color = vec4(1.00f,1.00f,1.00f,0.4);
}
