// Bank Account

// Write a function called createAccount which creates a bank account given a PIN number and an initial deposit amount.
// The return value should be an object with four methods on it:

// checkBalance: Given the correct PIN, return the current balance. (If the PIN is invalid, return “Invalid PIN.”)
// deposit: Given the correct PIN and a deposit amount, increment the account balance by the amount. (If the PIN is invalid, return “Invalid PIN.”)
// withdraw: Given the correct PIN and a withdrawal amount, decrement the account balance by the amount. You also shouldn’t be able to withdraw more than you have.
// (If the PIN is invalid, return “Invalid PIN.”)
// changePin: Given the old PIN and a new PIN, change the PIN number to the new PIN. (If the old PIN is invalid, return “Invalid PIN.”)
// let account = createAccount("1234", 100);

// account.checkBalance("oops");
// // "Invalid PIN."

// account.deposit("1234", 250);
// // "Succesfully deposited $250. Current balance: $350."

// account.withdraw("1234" 300);
// // "Succesfully withdrew $300. Current balance: $50."

// account.withdraw("1234" 10);
// // "Withdrawal amount exceeds account balance. Transaction cancelled."

// account.changePin("1234", "5678");
// // "PIN successfully changed!"

function createAccount(pin, amount = 0) {
	return {
		checkBalance(enteredPin) {
			return enteredPin !== pin ? 'Invalid PIN.' : `$${amount}`;
		},
		deposit(enteredPin, money) {
			if (enteredPin === pin) {
				amount += money;
				return `Successfully deposited $${money}. Current balance: $${amount}.`;
			} else {
				return 'Invalid PIN.';
			}
		},
		withdraw(enteredPin, money) {
			if (enteredPin === pin) {
				if (amount < money) {
					return 'Withdrawal amount exceeds account balance. Transaction cancelled.';
				} else {
					amount -= money;
					return `Successfully withdrew $${money}. Current balance: $${amount}.`;
				}
			} else {
				return 'Invalid PIN.';
			}
		},
		changePin(enteredPin, newPin) {
			if (enteredPin === pin) {
				pin = newPin;
				return 'PIN successfully changed!';
			} else {
				return 'Invalid PIN.';
			}
		}
	};
}

module.exports = { createAccount };
