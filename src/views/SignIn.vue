<template>
    <form action="#">
        <div>
            <label for="email">Email address</label>
            <input type="text" name="email" id="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="text" name="password" id="password">
        </div>
        <div>
            <button type="submit">
                Sign in
            </button>
        </div>
    </form>
</template>
 
<script>
export default {
    name: 'Signin',
    components: {
        //
    }
}
</script>