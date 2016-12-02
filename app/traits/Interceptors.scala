package traits

import interceptors.CheckToken
import play.api.mvc.BodyParsers._
import play.api.mvc.Action

trait Interceptors {
  def AuthAction(tokenService: ITokenService)(userType: String = null) = (Action andThen new CheckToken(tokenService, userType))
  def schemaCoerce[S <: JsonSchema](schema: SchemaObject[S]) = parse.json(schema.reads)
}
