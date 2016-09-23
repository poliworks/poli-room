import com.google.inject.AbstractModule
import traits.{IDiscovery, ITokenService}
import components._

class Module extends AbstractModule {

  override def configure() = {
    bind(classOf[ITokenService]).to(classOf[TokenService]).asEagerSingleton()
    bind(classOf[IDiscovery]).to(classOf[Discovery]).asEagerSingleton()
  }

}
