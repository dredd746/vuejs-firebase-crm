<template>
        <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
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
        <td>
          <button class="btn-small btn" @click="test(record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
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
    },
    methods: {
        test(id) {
            this.$message(id)
        }
    }
}
</script>