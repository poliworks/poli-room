package models.dao

import misc.json.schemas.RegisterEventSchema
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

  def registerNewEvent(reg: RegisterEventSchema, roomId: Long)(implicit session: DBSession): Event = {
    val id = sql"""INSERT INTO events (start_time, end_time, name, description, scheduled_by, recurrence, room_id)
          VALUES (${reg.startTime}, ${reg.stopTime}, ${reg.name}, ${reg.description}, ${reg.scheduledBy}, ${reg.recurrence}, ${roomId})""".updateAndReturnGeneratedKey.apply()
    new Event(reg.name, reg.description, reg.recurrence, reg.startTime, reg.stopTime, reg.scheduledBy, roomId, id)
  }

}
