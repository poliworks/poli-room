package controllers

import misc.exceptions.ForbiddenException
import misc.json.schemas.{LoginUserSchema, RegisterUserSchema}
import models.User
import play.api.Logger
import play.api.libs.json.{JsObject, Json}
import play.api.mvc.{Action, Controller}
import traits.Interceptors

class UserController extends Controller with Interceptors {

  def registerUser = Action(schemaCoerce(RegisterUserSchema)) { request =>
    val newUser = User.register(request.body)
    Ok(Json.toJson(newUser))
  }

  def login = Action(schemaCoerce(LoginUserSchema)) { request =>
    val user: Option[User] = User.login(request.body)
    Logger.info(user.toString)
    user match {
      case Some(u) => Ok(Json.toJson(u).as[JsObject] - "encryptedPassword")
      case None => throw new ForbiddenException("Incorrect email or password")
    }
  }


}
