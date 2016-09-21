package controllers

import javax.inject._
import play.api.mvc._
import traits.IDiscovery
import play.api.libs.json.Json

@Singleton
class MainController @Inject()(discovery: IDiscovery) extends Controller {

  def index = Action(parse.json) { request =>
    Ok("OK")
  }

  def getDiscovery = Action {
    val jsonResp = Json.toJson(discovery.routesFor("any"))
    Ok(jsonResp)
  }

}
