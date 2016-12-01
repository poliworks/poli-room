package controllers

import models.dao.FeatureDao
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

}
