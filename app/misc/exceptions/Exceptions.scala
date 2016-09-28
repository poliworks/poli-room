package misc.exceptions

import play.api.http.Status._
import play.api.libs.json.Json
import play.api.mvc.Result
import play.api.mvc.Results._

class HttpException(message: String, reason: String = "", code: Int) extends RuntimeException(message) {
  def resultType: Result = Status(code)(Json.obj("message" -> message, "reason" -> reason))
  def getReason = reason
}

class BadRequestException(message: String, reason: String = "") extends HttpException(message, reason, BAD_REQUEST)
class ForbiddenException(message: String, reason: String = "") extends HttpException(message, reason, FORBIDDEN)
class UnauthorizedException(message: String, reason: String = "") extends HttpException(message, reason, UNAUTHORIZED)
class NotFoundException(message: String, reason: String = "") extends HttpException(message, reason, NOT_FOUND)
