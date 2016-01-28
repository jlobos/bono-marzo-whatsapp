# -*- coding: utf-8 -*-

from yowsup.layers.interface import YowInterfaceLayer, ProtocolEntityCallback
from yowsup.layers.protocol_messages.protocolentities import TextMessageProtocolEntity
from yowsup.layers.protocol_receipts.protocolentities import OutgoingReceiptProtocolEntity
from yowsup.layers.protocol_acks.protocolentities import OutgoingAckProtocolEntity

from json import dumps
from zerorpc import Client

c = Client()
c.connect('tcp://127.0.0.1:4242')

class EchoLayer(YowInterfaceLayer):

    @ProtocolEntityCallback('message')
    def onMessage(self, messageProtocolEntity):
        if True:
            self.toLower(OutgoingReceiptProtocolEntity(messageProtocolEntity.getId(), messageProtocolEntity.getFrom(), 'read', messageProtocolEntity.getParticipant()))
            self.toLower(TextMessageProtocolEntity(c.input(self.out(messageProtocolEntity)), to = messageProtocolEntity.getFrom()))

    @ProtocolEntityCallback('receipt')
    def onReceipt(self, entity):
        self.toLower(OutgoingAckProtocolEntity(entity.getId(), 'receipt', entity.getType(), entity.getFrom()))

    def out(self, messageProtocolEntity):
        """
        Retorna la información de los mensajes recibidos en formato json
        """
        out = {
            'name': messageProtocolEntity.getNotify(),
            'id': messageProtocolEntity.getId(),
            'from': messageProtocolEntity.getFrom(),
            'participant': messageProtocolEntity.getParticipant(),
        }

        if messageProtocolEntity.getType() == 'text':
            out['body'] = messageProtocolEntity.getBody()
        elif messageProtocolEntity.getType() == 'media':
            # test
            print(messageProtocolEntity.getMediaType())
            if messageProtocolEntity.getMediaType() == 'image':
                out['image'] = { 'url': messageProtocolEntity.url, 'caption': messageProtocolEntity.getCaption() }

            elif messageProtocolEntity.getMediaType() == 'audio':
                out['audio'] = { 'url': messageProtocolEntity.url }

            elif messageProtocolEntity.getMediaType() == 'location':
                out['location'] = { 'latitude': messageProtocolEntity.getLatitude(), 'longitude': messageProtocolEntity.getLongitude() }

            elif messageProtocolEntity.getMediaType() == 'vcard':
                out['vcard'] = { 'name': messageProtocolEntity.getName(), 'cardData': messageProtocolEntity.getCardData() }

        return dumps(out)
