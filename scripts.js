let wallet = {}

const config = {
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
    walletUrl: "https://wallet.testnet.near.org",
    helperUrl: "https://helper.testnet.near.org",
    explorerUrl: "https://explorer.testnet.near.org",
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
};

(async function () {
    var contract = {};
    window.near = await nearApi.connect(config);
    wallet = new nearApi.WalletConnection(near, 'NEAR plugin');

    if (wallet.isSignedIn()) {
        var walletAccountId = wallet.getAccountId();
        var account = await near.account(walletAccountId);
        document.querySelector(".btnLogin").innerHTML = "Log out"
        document.querySelector(".accountId span").innerHTML = walletAccountId;
        document.querySelector(".accountBalance span").innerHTML = (account._state.amount / 1000000000000000000000000).toFixed(3);
    }

    const signIn = () => {

        wallet.requestSignIn(
            "", // contract requesting access
            null, // optional
            null, // optional
            null // optional
        );

    };

    const signOut = () => {
        wallet.signOut();
        location.reload();
    };

    const {
        utils
    } = nearApi;

    const sendToken = async () => {
        await account.sendMoney(
            document.querySelector("#token-receiver").value, // receiver account
            utils.format.parseNearAmount(document.querySelector("#token-amount").value.toString()) // amount in yoctoNEAR
        );
        const accountUpdate = await near.account(walletAccountId);
        document.querySelector(".accountBalance span").innerHTML = (accountUpdate._state.amount / 1000000000000000000000000).toFixed(3);
        document.querySelector(".token-transfer-successful-modal-loader").style.display = "none";
        document.querySelector(".token-transfer-successful-modal-close").style.display = "block";
        document.querySelector(".token-transfer-successful-modal-text").innerHTML = "Token transfer successful";
    }

    function removeDuplicatedMethods(methods) {
        let filtered_methods = []

        for (let method of methods) {
            let snake_case_method = method.replace(/[A-Z]/g, (letter, index) => {
                return index === 0 ? letter.toLowerCase() : '_' + letter.toLowerCase();
            });
            let camel_case_method = method.toLowerCase().replace(/[-_][a-z]/g, (group) => group.slice(-1).toUpperCase());
            if (!filtered_methods.includes(method) && !filtered_methods.includes(snake_case_method) && !filtered_methods.includes(camel_case_method))
                filtered_methods.push(method)
        }

        return filtered_methods
    }

    document.querySelector(".btnLogin").addEventListener("click", function () {
        if (wallet.isSignedIn()) {
            signOut();
        } else {
            signIn();
        }
    });


    document.querySelector(".btnSendToken").addEventListener("click", function (event) {
        event.preventDefault();
        if (wallet.isSignedIn()) {
            document.querySelector(".token-transfer-successful-modal").style.display = "flex";
            sendToken();
        } else {
            signIn();
        }
    });

    document.querySelector(".token-transfer-successful-modal-close").addEventListener("click", function (event) {
        document.querySelector(".token-transfer-successful-modal").style.display = "none";
    });

    document.querySelector(".contract-submit-button").addEventListener("click", async function () {
        const response =
            await fetch('https://rpc.testnet.near.org', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "jsonrpc": "2.0",
                    "id": "dontcare",
                    "method": "query",
                    "params": {
                        "account_id": document.querySelector(".contract-input").value,
                        "request_type": "view_code",
                        "finality": "final"
                    }
                })
            });
        let res_json = await response.json();
        console.log('response: ', res_json);
        let code_base64 = res_json.result.code_base64;
        let parsed_contract = await nearContractParser.parseContract(code_base64);

        const contractMethodsArray = removeDuplicatedMethods(parsed_contract.methodNames);
        document.querySelector(".contract-method-form").style.display = "block";
        for (let i = 0; i < contractMethodsArray.length; i++) {
            const contractMethodOption = document.createElement("option");
            document.querySelector("#contract-methods-select").appendChild(contractMethodOption);
            contractMethodOption.innerHTML = contractMethodsArray[i];
            contractMethodOption.value = contractMethodsArray[i];
        }
        document.querySelector(".contract-methods-label span").innerHTML = "for " + document.querySelector(".contract-input").value;

        contract = new nearApi.Contract(account, document.querySelector(".contract-input").value, {
            viewMethods: removeDuplicatedMethods(parsed_contract.methodNames),
            changeMethods: ['say_hi', 'who_said_hi'],
            sender: account
        });
    });


    document.querySelector(".contract-method-view-button").addEventListener("click", async function (event) {
        event.preventDefault();
        const calledContract = document.forms["contract-method-form-id"].contractMethodsSelect.value;
        const viewedMethod = await contract.who_said_hi();
        document.querySelector(".contract-method-called-contract").innerHTML = `whoSaidHi(); ${viewedMethod}`;
    });

    document.querySelector(".contract-method-change-button").addEventListener("click", function (event) {
        event.preventDefault();
        document.querySelector(".arguments-deposits-parent").style.display = "block";
    });

    document.querySelector(".contract-method-change-after-input-button").addEventListener("click", async function (event) {
        event.preventDefault();
        document.querySelector(".arguments-deposits-parent").style.display = "none";
        const changedMethod = await contract.say_hi(
            JSON.parse(document.querySelector(".contract-method-arguments").value),
            "", // attached GAS (optional)
            document.querySelector(".contract-method-deposit").value // attached deposit in yoctoNEAR (optional)
        );
        document.querySelector(".contract-method-called-contract").innerHTML = `sayHi(): ${changedMethod}`;
    });

})(window);


function preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
        e.preventDefault();
}
