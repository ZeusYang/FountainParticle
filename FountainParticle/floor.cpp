#include "floor.h"

Floor::Floor() {
	float width = 50.0f;
	float vertices[] = {
		width,0,  width,
		width,0, -width,
		-width,0, -width,

		width,0,  width,
		-width,0, -width,
		-width,0,  width
	};
	shader = new Shader("../res/Shaders/floor.vs", "../res/Shaders/floor.fs");
	glGenVertexArrays(1, &VAO);
	glGenBuffers(1, &VBO);
	glBindVertexArray(VAO);
	glBindBuffer(GL_ARRAY_BUFFER, VBO);
	glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), &vertices[0], GL_STATIC_DRAW);
	glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (GLvoid*)0);
	glEnableVertexAttribArray(0);
	glBindVertexArray(0);
	glBindBuffer(GL_ARRAY_BUFFER, 0);
}

Floor::~Floor() {
	glDeleteBuffers(1, &VBO);
	glDeleteVertexArrays(1, &VAO);
}

void Floor::render(glm::mat4 model, glm::mat4 view, glm::mat4 projection) {
	shader->use();
	shader->setMat4("model", model);
	shader->setMat4("view", view);
	shader->setMat4("projection", projection);
	glBindVertexArray(VAO);
	glDrawArrays(GL_TRIANGLES, 0, 106);
	glBindVertexArray(0);
}