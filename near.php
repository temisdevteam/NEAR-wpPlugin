<link rel="stylesheet" href="<?php echo get_site_url() . '/wp-content/plugins/NEAR/style.css'; ?>">

<section class="wallet-section">
    <div class="box">
        <h1>Wordpress Near</h1>
        <button class="wallet-btn btnLogin">Login</button>
        <div class="account-info-section">
            <p class="accountId">Hello <span></span></p>
            <p class="accountBalance">Your Balance: <span></span></p>
        </div>
        <div class="send-token-section">
            <form class="transfer-token-form" method="POST">
                <input class="wallet-input" id="token-receiver" type="text" placeholder="receiver..." required>
                <input class="wallet-input" id="token-amount" type="number" onkeypress="preventNonNumericalInput(event)" placeholder="amount..." required>
                <button type="submit" class="wallet-btn btnSendToken">Send Token</button>
            </form>
            <div class="token-transfer-successful-modal">
                <div class="token-transfer-successful-modal-box">
                    <div class="token-transfer-successful-modal-loader"></div>
                    <span class="token-transfer-successful-modal-close">&times;</span>
                    <p class="token-transfer-successful-modal-text"></p>
                </div>
            </div>
        </div>

        <div class="contract-methods-section">
            <h2>Contract</h2>

            <input class="contract-input" placeholder="Contract" type="text">
            <button class="contract-submit-button">Submit</button>
            <br><br>

            <form class="contract-method-form" id="contract-method-form-id">
                <label class="contract-methods-label" for="contract-methods-select">Contract methods <span></span></label>
                <select name="contractMethodsSelect" id="contract-methods-select">
                </select>

                <div class="d-flex">
                    <button class="contract-method-view-button" type="submit" value="View">View</button>
                    <button class="contract-method-change-button" type="submit" value="Change">Change</button>
                </div>
                <div class="arguments-deposits-parent">
                    <label>Arguments (JSON) (Optional)</label>
                    <input class="contract-method-arguments" type="text" placeholder='{argument1:"value",...}'>

                    <label>Deposit (Optional)</label>
                    <input class="contract-method-deposit" type="number" placeholder='0'>
                    <button class="contract-method-change-after-input-button">Add</button>
                </div>
            </form>

            <p class="contract-method-called-contract"></p>

        </div>

    </div>
</section>
</main>

<script type="application/javascript" src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/bufferUMD@master/dist/bundle.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/near-api-js@0.41.0/dist/near-api-js.js"></script>
<script src="https://cdn.jsdelivr.net/gh/nearprotocol/near-api-js/dist/near-api-js.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Danail-Irinkov/near-contract-parser-umd@main/dist/bundle.js"></script>

<script type="text/javascript" src="<?php echo plugin_dir_url(__FILE__); ?>scripts.js" defer></script>