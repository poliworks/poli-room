package controllers

import javax.inject._
import play.api._
import play.api.mvc._

@Singleton
class MainController @Inject() extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

}
