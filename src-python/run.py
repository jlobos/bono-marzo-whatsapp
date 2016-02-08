from yowsup.layers import YowParallelLayer
from yowsup.layers.auth import YowAuthenticationProtocolLayer
from yowsup.layers.protocol_messages import YowMessagesProtocolLayer
from yowsup.layers.protocol_receipts import YowReceiptProtocolLayer
from yowsup.layers.protocol_acks import YowAckProtocolLayer
from yowsup.layers.protocol_media import YowMediaProtocolLayer
from yowsup.layers.protocol_iq import YowIqProtocolLayer
from yowsup.layers.protocol_calls import YowCallsProtocolLayer
from yowsup.layers.network import YowNetworkLayer
from yowsup.layers.coder import YowCoderLayer
from yowsup.stacks import YowStack, YOWSUP_CORE_LAYERS
from yowsup.common import YowConstants
from yowsup.layers import YowLayerEvent
from yowsup.layers.axolotl import YowAxolotlLayer
from yowsup import env

from layer import EchoLayer
from config import phone, password

CREDENTIALS = (phone, password)

if __name__==  '__main__':
    print '''
       /\___/\\
      ( o   o )  \tbono-marzo-whatsapp
      (  =^=  )  \t@jlobos27
      (        ) \t-------------------
      (         )
      (          )))))))))))
    '''

    layers = (
        EchoLayer,
        YowParallelLayer([YowAuthenticationProtocolLayer, YowMessagesProtocolLayer, YowReceiptProtocolLayer, YowAckProtocolLayer, YowMediaProtocolLayer, YowIqProtocolLayer, YowCallsProtocolLayer]),
        YowAxolotlLayer
    ) + YOWSUP_CORE_LAYERS

    stack = YowStack(layers)

    # setting credentials
    stack.setProp(YowAuthenticationProtocolLayer.PROP_CREDENTIALS, CREDENTIALS)
    # whatsapp server address
    stack.setProp(YowNetworkLayer.PROP_ENDPOINT, YowConstants.ENDPOINTS[0])
    stack.setProp(YowCoderLayer.PROP_DOMAIN, YowConstants.DOMAIN)
    # info about us as WhatsApp client
    stack.setProp(YowCoderLayer.PROP_RESOURCE, env.CURRENT_ENV.getResource())

    # sending the connect signal
    stack.broadcastEvent(YowLayerEvent(YowNetworkLayer.EVENT_STATE_CONNECT))

    # this is the program mainloop
    try:
        stack.loop()
    except:
        print('Error!!')
