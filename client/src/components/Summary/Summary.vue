<template>
  <div class="summary" >
      <h3 class="section-header">{{ title }} Summary</h3>
      <div class="summary-box">
        <p v-if="title === 'Block'">
          This block was mined on {{ item.date.data }} at {{ item.time.data }}. 
          <br><br>
          It has a {{ item.totalTxs.data }} transactions, totalling an amount of {{ totalValue }}, with an average transaction value of {{ averageValue }}. 
        </p>
        <p v-else-if="title === 'Transaction'">
          This transaction was sent on {{ item.date.data }} at {{ item.time.data }}. 
          <br><br>
          It has a value of {{ item.amount.data }} and a fee of {{ item.fee.data }}. 
          <br><br>
          The transaction includes the memo: {{ item.memo.data }}
        </p>
        <p v-else-if="title === 'Wallet'">
          This wallet, with the address {{ item.address.data }}, has a balance of {{ item.balance.data }} and a nonce of {{ item.nonce.data }}.
          <br><br>
          There are {{ item.totalTxs.data }} transactions linked to the wallet.
        </p>
      </div>
    </div>
</template>

<script>


export default {
  name: "Summary",
  props: ['title', 'item'],
  computed: {
    totalValue() {
      if (this.item.transactions) {
        let total = 0;
        this.item.transactions.forEach(tx => {
          total += parseInt(tx.amount.data)
        })
        return total;
      } 
      return null
    },
    averageValue() {
      if (this.item.totalTxs) {
        return (this.totalValue / this.item.totalTxs.data).toFixed(5) ;
      }
      return null
    }
  }
}
</script>

<style>
.summary {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-self: stretch;
}

.summary-box {
  flex-grow: 1;
}

.summary-box {
  background-color: white;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
}
</style>
