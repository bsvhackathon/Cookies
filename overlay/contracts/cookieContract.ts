import {
    assert,
    ByteString,
    method,
    prop,
    SmartContract,
    Addr,
    SigHash,
    Utils,
    hash256,
    MethodCallOptions,
    bsv
} from 'scrypt-ts'


export class CookieContract extends SmartContract {
    @prop()
    metaNetClientAddr: Addr

    @prop(true)
    cookiePrice: bigint

    constructor(metaNetClientAddr: Addr, cookiePrice: bigint) {
        super(...arguments)
        // this.init(...arguments)

        this.metaNetClientAddr = metaNetClientAddr
        this.cookiePrice = cookiePrice
    }

    @method(SigHash.ANYONECANPAY_ALL)
    public cookieSale(dest: Addr) {

        let outputs = Utils.buildPublicKeyHashOutput(dest, 1n)
        outputs += Utils.buildPublicKeyHashOutput(this.metaNetClientAddr, this.cookiePrice)
        outputs += this.buildChangeOutput()
        assert(hash256(outputs) == this.ctx.hashOutputs, 'hashOutputs mismatch')
    }
}

export function purchaseTxBuilder(
    current: CookieContract,
    options: MethodCallOptions<CookieContract>,
    dest: Addr
): Promise<any> {
    const unsignedTx: bsv.Transaction = new bsv.Transaction()
        .addInput(current.buildContractInput())
        .addOutput(
            new bsv.Transaction.Output({
                script: bsv.Script.fromHex(
                    Utils.buildPublicKeyHashScript(dest)
                ),
                satoshis: 1,
            })
        )
        // build payment output
        .addOutput(
            new bsv.Transaction.Output({
                script: bsv.Script.fromHex(
                    Utils.buildPublicKeyHashScript(current.metaNetClientAddr)
                ),
                satoshis: Number(current.cookiePrice),
            })
        )

    if (options.changeAddress) {
        unsignedTx.change(options.changeAddress)
    }

    const result = {
        tx: unsignedTx,
        atInputIndex: 0, // the contract input's index
    }

    return Promise.resolve(result)
}
