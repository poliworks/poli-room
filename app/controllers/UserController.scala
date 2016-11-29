package controllers

import misc.json.schemas.RegisterUserSchema
import models.User
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}
import traits.Interceptors

class UserController extends Controller with Interceptors {

  def registerUser = Action(schemaCoerce(RegisterUserSchema)) { request =>
    val regSchema = request.body
    val newUser = User.register(regSchema)
    Ok("")
  }

}
