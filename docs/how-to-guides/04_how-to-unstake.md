To unstake resources, [submit a transaction](01_how-to-submit-a-transaction.md) to the [`undelegatebw`](https://github.com/ARISENIO/arisen.contracts/blob/52fbd4ac7e6c38c558302c48d00469a4bed35f7c/contracts/arisen.system/include/arisen.system/arisen.system.hpp#L1000) action of the `arisen` account.

In the example shown below `useraaaaaaaa` unstakes **1.0000 RIX** of NET and CPU from the account `mynewaccount`.
```javascript
(async () => {
  await api.transact({
    actions: [{
      account: 'arisen',
      name: 'undelegatebw',
      authorization: [{
        actor: 'useraaaaaaaa',
        permission: 'active',
      }],
      data: {
        from: 'useraaaaaaaa',
        receiver: 'mynewaccount',
        stake_net_quantity: '1.0000 RIX',
        stake_cpu_quantity: '1.0000 RIX',
        transfer: false,
      }
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  });
})();
```