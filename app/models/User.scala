package models

import scalikejdbc._
import traits.DatabaseModel

case class User(name: String, email: String, encryptedPassword: String, userType: String, id: Long = 0L)

object User extends DatabaseModel[User]("users") {

  override def apply(rn: ResultName[User])(rs: WrappedResultSet): User = User(
    rs.get(rn.name), rs.get(rn.email), rs.get(rn.encryptedEmail), rs.get(rn.userType) ,rs.get(rn.id)
  )

}
