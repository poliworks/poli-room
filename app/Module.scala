import com.google.inject.AbstractModule
import traits.{IDiscovery, ITokenService}
import components.Discovery
import components.TokenService

class Module extends AbstractModule {

  override def configure() = {
    bind(classOf[ITokenService]).to(classOf[TokenService]).asEagerSingleton()
    bind(classOf[IDiscovery]).to(classOf[Discovery]).asEagerSingleton()
  }

}
