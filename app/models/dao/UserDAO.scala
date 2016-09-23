package models.dao

import models.User
import scalikejdbc._

class UserDAO {

  private val u = User.syntax("u")

  def createUser(user: User)(implicit session: DBSession): User = {
    val id = sql"INSERT INTO users (name, email, user_type, encrypted_password) VALUES (${user.name}, ${user.email}, ${user.userType}, ${user.encryptedPassword})"
      .updateAndReturnGeneratedKey.apply
    user.copy(id = id)
  }

  def findUserById(id: Long)(implicit session: DBSession): Option[User] = {
    sql"SELECT * FROM users WHERE id = ${id}".map(User.apply).single.apply()
  }

  def findUserByEmail(email: String)(implicit session: DBSession): Option[User] = {
    sql"SELECT * FROM users WHERE email = ${email}".map(User.apply).single.apply()
  }

}
