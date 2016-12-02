package controllers

import models.Feature
import models.dao.FeatureDao
import play.api.libs.json.Json
import play.api.mvc._
import scalikejdbc._

/**
  * Created by leoiacovini on 12/1/16.
  */
class FeatureController extends Controller {

  def removeFeature(featureId: Long) = Action {
    DB localTx { implicit session => new FeatureDao().removeFeature(featureId) }
    Ok
  }

  def getAllFeatures() = Action {
    val features: List[Feature] = DB readOnly { implicit session => new FeatureDao().getAllFeatures }
    Ok(Json.toJson(features))
  }

}
