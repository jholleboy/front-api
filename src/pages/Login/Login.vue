<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        API TESTE
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Entrar na API</h3>" customHeader>
        <p class="widget-auth-info">
            Use Login: admin@admin.com Senha : Admin.
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="email" required type="email" name="email" placeholder="Email" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password" required type="password" name="password" placeholder="Senha" />
          </div>
          <b-button type="submit" size="sm" class="auth-btn mb-3" variant="inverse">Login</b-button>
          
          
        </form>
        
        
      </Widget>
    </b-container>
    <footer class="auth-footer">
      Joseph C.
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
     
      errorMessage: null,
    };
  },
  methods: {
    
    login() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;
      
      if (email == "admin@admin.com" & password == "admin" ) {
        window.localStorage.setItem('authenticated', true);
        alert("LOGADO!");
        this.$router.push('/app/desenvolvedor');
      } else {
        alert("Não foi Possivel Logar,Verifique Email e Senha")
    
    }
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/main/analytics');
    }
  },
};
</script>
