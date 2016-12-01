package controllers

import models.dao.EventDao
import play.api.mvc.{Action, Controller}
import scalikejdbc._

/**
  * Created by leoiacovini on 12/1/16.
  */
class EventController extends Controller {

  def removeEvent(eventId: Long) = Action {
    DB localTx { implicit session => new EventDao().removeEvent(eventId) }
    Ok
  }

}
