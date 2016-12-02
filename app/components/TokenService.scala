package components

import javax.inject.Inject
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import play.api.Configuration
import play.api.libs.json.{JsValue, Json}
import traits.ITokenService
import scala.util.Try

class TokenService @Inject()(config: Configuration) extends ITokenService {

  private val jwtSecretKey = config.getString("jwtSecretKey").get
  private val oneDay = 60 * 60 * 24

  override def decode(token: String): Try[JsValue] = {
      Jwt.decode(token, jwtSecretKey, Seq(JwtAlgorithm.HS256)).map( Json.parse )
  }

  override def create(userId: Long, userType: String): String = {
    val claim = s""" {"id": $userId, "userType": "$userType"} """
    val accessClaim = JwtClaim(claim).issuedNow.expiresIn(oneDay)
    Jwt.encode(accessClaim, jwtSecretKey, JwtAlgorithm.HS256)
  }

  override def validate(token: String, userType: Option[String]): Try[JsValue] = {
    val decodedToken = decode(token)
    userType match {
      case Some(s) => decodedToken.filter(tk => (tk \ "userType").as[String] == s)
      case None => decodedToken
    }
  }
}
