import * as React from 'react'
import * as Types from '../../../../constants/types/chat2'
import {ServiceIdWithContact} from '../../../../constants/types/team-building'
import * as Kb from '../../../../common-adapters'
import {formatTimeForChat} from '../../../../util/timestamp'
import {e164ToDisplay} from '../../../../util/phone-numbers'
import {serviceIdToPrettyName} from '../../../../constants/team-building'

type Props = {
  message: Types.MessageSystemSBSResolved
  you: string
}

const connectedUsernamesProps = {
  colorFollowing: true,
  inline: true,
  onUsernameClicked: 'profile',
  type: 'BodySmallSemibold',
  underline: true,
} as const

const formatAssertion = (serviceUser: string, service: ServiceIdWithContact, isYou: boolean): string => {
  if (isYou) {
    return formatAssertionYou(serviceUser, service)
  }
  switch (service) {
    case 'phone':
      return `verified their phone number ${e164ToDisplay('+' + serviceUser)}`
    case 'email':
      return `verified their email address ${serviceUser}`
    default:
      return `proved they are ${serviceUser} on ${serviceIdToPrettyName(service) || service}`
  }
}

const formatAssertionYou = (serviceUser: string, service: ServiceIdWithContact): string => {
  switch (service) {
    case 'phone':
      return `verified your phone number ${e164ToDisplay('+' + serviceUser)}`
    case 'email':
      return `verified your email address ${serviceUser}`
    default:
      return `proved you are ${serviceUser} on ${serviceIdToPrettyName(service) || service}`
  }
}

const SBSProvedNotice = (props: Props) => {
  const {timestamp, prover, assertionUsername, assertionService} = props.message
  const isYou = props.you === prover
  return (
    <Kb.Box2 direction="vertical" fullWidth={true}>
      <Kb.Text type="BodyTiny">{formatTimeForChat(timestamp)}</Kb.Text>
      <Kb.Text type="BodySmall">
        {isYou ? 'You' : <Kb.ConnectedUsernames {...connectedUsernamesProps} usernames={[prover]} />} can read
        this chat now because {isYou ? 'you' : 'they'}{' '}
        {assertionService && formatAssertion(assertionUsername, assertionService, isYou)}.
      </Kb.Text>
    </Kb.Box2>
  )
}

export default SBSProvedNotice
