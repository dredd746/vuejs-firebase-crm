<template>
        <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Denumirea</th>
        <th>Adresa</th>
        <th>Posta</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record,idx) of records"
      :key="record.id"
      >
        <td>{{idx + 1}}</td>
        <td>{{record.title}}</td>
        <td>{{record.adress}}</td>
        <td>{{record.email}}</td>
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