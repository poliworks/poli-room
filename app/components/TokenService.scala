package components

import java.io.FileReader
import java.security.PublicKey
import javax.inject.Inject
import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo
import org.bouncycastle.openssl.PEMParser
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter
import pdi.jwt.{Jwt, JwtAlgorithm, JwtClaim}
import play.api.Configuration
import play.api.libs.json.{JsValue, Json}
import traits.ITokenService

import scala.util.Try

class TokenService @Inject()(config: Configuration) extends ITokenService {

  private val jwtSecretKey = config.getString("jwtSecretKey").get
  private val jwtPublicKey: PublicKey = {
    val pem = new PEMParser(new FileReader("conf/jwtKey.key.pub")).readObject()
    new JcaPEMKeyConverter().getPublicKey(pem.asInstanceOf[SubjectPublicKeyInfo])
  }

  private val oneDay = 60 * 60 * 24

  override def decode(token: String): Try[JsValue] = {
      Jwt.decode(token, jwtSecretKey, Seq(JwtAlgorithm.HS256)).map( Json.parse )
  }

  def decodeRSA(token: String): Try[JsValue] = {
    Jwt.decode(token, jwtPublicKey, Seq(JwtAlgorithm.RS256)).map(Json.parse)
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
