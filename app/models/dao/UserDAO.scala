package models.dao

import models.User
import scalikejdbc._

class UserDAO(session: DBSession) {

  private implicit val dbSession = session

  def createUser(user: User): User = {
    val id = sql"INSERT INTO users (name, email, user_type, encrypted_password) VALUES (${user.name}, ${user.email}, ${user.userType}, ${user.encryptedPassword})"
      .updateAndReturnGeneratedKey.apply
    user.copy(id = id)
  }

}
