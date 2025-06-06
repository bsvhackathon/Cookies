import { AdmittanceInstructions, TopicManager } from '@bsv/overlay'
import { PublicKey, Signature, Transaction } from '@bsv/sdk'
import pushdrop from 'pushdrop'
import { getDocumentation } from '../utils/getDocumentation.js'
import { CookieContract } from '../../contracts/cookieContract';
import cookieArtifacts from '../../artifacts/cookieContract.json';
CookieContract.loadArtifact(cookieArtifacts)

/**
 *  Note: The PushDrop package is used to decode BRC-48 style Pay-to-Push-Drop tokens.
 */
export class CookieTopicManager implements TopicManager {
  /**
   * Identify if the outputs are admissible depending on the particular protocol requirements
   * @param beef - The transaction data in BEEF format
   * @param previousCoins - The previous coins to consider
   * @returns A promise that resolves with the admittance instructions
   */
  async identifyAdmissibleOutputs(beef: number[], previousCoins: number[]): Promise<AdmittanceInstructions> {
    const outputsToAdmit: number[] = []
    try {
      const parsedTransaction = Transaction.fromBEEF(beef)

      // Try to decode and validate transaction outputs
      for (const [i, output] of parsedTransaction.outputs.entries()) {
        try {

          //Parse sCrypt locking script
          const script = output.lockingScript.toHex()
          const cookie = CookieContract.fromLockingScript(script)
          console.log(cookie)

          outputsToAdmit.push(i)
        } catch (error) {
          console.error('Error processing output:', error)
          // Continue processing other outputs
        }
      }
      if (outputsToAdmit.length === 0) {
        console.warn('No outputs admitted!')
        // throw new ERR_BAD_REQUEST('No outputs admitted!')
      }
    } catch (error) {
      console.error('Error identifying admissible outputs:', error)
    }

    return {
      outputsToAdmit,
      coinsToRetain: []
    }
  }

  /**
   * Get the documentation associated with this topic manager
   * @returns A promise that resolves to a string containing the documentation
   */
  async getDocumentation(): Promise<string> {
    return await getDocumentation('./docs/HelloWorld/helloworld-lookup-service.md')
  }

  /**
   * Get metadata about the topic manager
   * @returns A promise that resolves to an object containing metadata
   * @throws An error indicating the method is not implemented
   */
  async getMetaData(): Promise<{
    name: string
    shortDescription: string
    iconURL?: string
    version?: string
    informationURL?: string
  }> {
    throw new Error('Method not implemented.')
  }
}
