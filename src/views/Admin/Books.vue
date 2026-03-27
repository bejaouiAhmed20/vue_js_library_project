<script setup lang="ts">


</script>

<template>
    <h1>Books</h1>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add book</button>
    <table>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Editor</th>
            <th>Year</th>
            <th>Image</th>
            <th>Author</th>
            <th>summary</th>
            <th>ACTIONS</th>
        </tr>
        <tr>
            <td>1</td>
            <td>Book 1</td>
            <td>Editor 1</td>
            <td>2020</td>
            <td><img src="https://via.placeholder.com/50" alt="Book 1" /></td>
            <td>Author 1</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
            <td>
                <button class="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                <button class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </td>
        </tr>


    </table>
  
</template>
