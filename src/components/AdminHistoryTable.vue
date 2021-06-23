<template>
        <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Suma</th>
        <th>Data</th>
        <th>Client</th>
        <th>Tip</th>
        <th>User</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record,idx) of records"
      :key="record.id"
      >
        <td>{{idx + 1}}</td>
        <td>{{record.typePlus}}{{record.amount}}&#8364;</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName }}</td>
        <td>
          <span class="white-text badge"
          :class="[record.typeClass]"
          >{{record.typeText}}</span>
        </td>
        <td>{{record.userName}}</td>
        
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>