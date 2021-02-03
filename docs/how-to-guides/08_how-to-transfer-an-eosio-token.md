To transfer an arisen token, [submit a transaction](01_how-to-submit-a-transaction.md) to the [`transfer`](https://github.com/ARISENIO/arisen.contracts/blob/52fbd4ac7e6c38c558302c48d00469a4bed35f7c/contracts/arisen.token/include/arisen.token/arisen.token.hpp#L83) action of the account storing the token you wish to transfer.

In the example shown below `useraaaaaaaa` transfers **1.0000 RSN** token stored in the `arisen.token` account from `useraaaaaaaa` to `userbbbbbbbb`.
```javascript
(async () => {
  await api.transact({
    actions: [{
      account: 'arisen.token',
      name: 'transfer',
      authorization: [{
        actor: 'useraaaaaaaa',
        permission: 'active',
      }],
      data: {
        from: 'useraaaaaaaa',
        to: 'userbbbbbbbb',
        quantity: '1.0000 RIX',
        memo: 'some memo'
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
})();
```