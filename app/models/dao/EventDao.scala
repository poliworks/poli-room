package models.dao

import models.Event
import scalikejdbc._

/**
  * Created by leoiacovini on 11/30/16.
  */
class EventDao {

  private val e = Event.syntax("e")

  def getAllEventsForRoom(roomId: Long)(implicit session: DBSession): List[Event] = withSQL {
      select.from(Event as e).where.eq(e.roomId, roomId)
    }.map(Event(e.resultName)).list.apply()

}
