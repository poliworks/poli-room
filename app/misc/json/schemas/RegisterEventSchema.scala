package misc.json.schemas

import java.util.UUID

import org.joda.time.DateTime
import play.api.libs.json.{JsValue, Json, Reads, Writes}
import traits.{JsonSchema, SchemaObject}

/**
  * Created by leoiacovini on 12/1/16.
  */
case class RegisterEventSchema(name: String, description: String, recurrence: String, scheduledBy: UUID, startTime: DateTime, endTime: DateTime) extends JsonSchema {
  override def toJson: JsValue = Json.toJson(this)
}

object RegisterEventSchema extends SchemaObject[RegisterEventSchema] {
  override implicit val reads: Reads[RegisterEventSchema] = Json.reads[RegisterEventSchema]
  override implicit val writes: Writes[RegisterEventSchema] = Json.writes[RegisterEventSchema]
}
