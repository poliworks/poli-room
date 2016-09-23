package controllers

import javax.inject._

import misc.json.schemas.RegisterUserSchema
import play.api.mvc._
import traits.{IDiscovery, ITokenService, Interceptors}
import play.api.libs.json.Json

@Singleton
class MainController @Inject()(discovery: IDiscovery, tokenService: ITokenService) extends Controller with Interceptors {

  def index = Action(parse.json) { request =>
    Ok("OK")
  }

  def getDiscovery = Action {
    val jsonResp = Json.toJson(discovery.routesFor("any"))
    Ok(jsonResp)
  }

  def protectedRoute = AuthAction(tokenService)("user") { request =>
    Ok("Sim")
  }

}
