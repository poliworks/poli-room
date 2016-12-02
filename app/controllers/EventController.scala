package controllers

import javax.inject.Inject

import models.dao.EventDao
import play.api.mvc.{Action, Controller}
import scalikejdbc._
import traits.{ITokenService, Interceptors}

/**
  * Created by leoiacovini on 12/1/16.
  */
class EventController @Inject()(tokenService: ITokenService) extends Controller with Interceptors {

  def removeEvent(eventId: Long) = AuthAction(tokenService)(null) {
    DB localTx { implicit session => new EventDao().removeEvent(eventId) }
    Ok
  }

}
