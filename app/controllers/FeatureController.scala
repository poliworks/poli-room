package controllers

import javax.inject.Inject

import models.Feature
import models.dao.FeatureDao
import play.api.libs.json.Json
import play.api.mvc._
import scalikejdbc._
import traits.{ITokenService, Interceptors}

/**
  * Created by leoiacovini on 12/1/16.
  */
class FeatureController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def removeFeature(featureId: Long) = AuthAction(tokenService)(null) {
    DB localTx { implicit session => new FeatureDao().removeFeature(featureId) }
    Ok
  }

  def getAllFeatures() = AuthAction(tokenService)(null) {
    val features: List[Feature] = DB readOnly { implicit session => new FeatureDao().getAllFeatures }
    Ok(Json.toJson(features))
  }

}
