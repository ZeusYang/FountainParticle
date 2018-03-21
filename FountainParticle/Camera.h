#pragma once
#define GLEW_STATIC
#include <GL\glew.h>

#include <vector>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <iostream>

namespace Camera {

	enum Camera_Movement {
		FORWARD,
		BACKWARD,
		LEFTS,
		RIGHTS
	};

	const GLfloat YAW = -90.0f;
	const GLfloat PITCH = 0.0f;
	const GLfloat SPEED = 30.0f;
	const GLfloat SENSITIVITY = 0.25f;
	const GLfloat ZOOM = 45.0f;

	class Camera {
	public:
		glm::vec3 Position;
		glm::vec3 Front;
		glm::vec3 Up;
		glm::vec3 Right;
		glm::vec3 WorldUp;

		GLfloat Yaw;
		GLfloat Pitch;

		GLfloat MovementSpeed;
		GLfloat MouseSensitivity;
		GLfloat Zoom;

		Camera::Camera(glm::vec3 position = glm::vec3(0.0f, 0.0f, 0.0f), 
			glm::vec3 up = glm::vec3(0.0f, 1.0f, 0.0f), GLfloat yaw = YAW,GLfloat pitch = PITCH);

		Camera(GLfloat posX, GLfloat posY, GLfloat posZ, GLfloat upX, GLfloat upY, GLfloat upZ,
			GLfloat yaw, GLfloat pitch);

		glm::mat4 GetViewMatrix();

		void ProcessKeyboard(Camera_Movement direction, GLfloat deltaTime);

		void ProcessMouseMovement(GLfloat xoffset, GLfloat yoffset, GLboolean constrainPitch = true);

		void ProcessMouseScroll(GLfloat yoffset);

	private:

		void updateCameraVectors();
	};

}