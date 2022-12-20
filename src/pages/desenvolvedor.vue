<template>
  <v-app>
    <v-card>
      <v-card-title>
        Desenvolvedor
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                @click="criarDesenvolvedor"
              >
              Criar Desenvolvedor
              </v-btn><v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="desenvolvedor"
        :search="search"
        :loading="loadTable"
        loading-text="Carregando... Por favor,aguarde!"
      >
  
  
      <template v-slot:top>
        <v-toolbar
          flat
        >
        <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
                <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edição de Desenvolvedor</h5>
              <v-btn
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="close"
              >
                <span aria-hidden="true">&times;</span>
              </v-btn>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="atualizarDesenvolvedor">
                <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
              <select class="form-control" ref="Nivel">
                <option value="1" selected>Selecione um Nivel</option>
                <option v-for="NivelNome in NivelNome" :key="NivelNome.id" :value="NivelNome.id">{{ NivelNome.Nivel }}</option>
              </select>
              
              
              
              <div class="mb-3">
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  type="submit"
                >
                  Salvar
                </v-btn>
              </div>
              </form>
            </div>
          </div>
        </div>
            </v-card>
          </v-dialog>
  
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Deseja remover esse registro?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm(item)">Sim</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
  
          <v-dialog
            v-model="dialogRelatorio"
          >
            <v-card>
                <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Usuário Visão</h5>
              <v-btn
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="closeRelatorio"
              >
                <span aria-hidden="true">&times;</span>
              </v-btn>
            </div>
            
          </div>
        </div>
            </v-card>
          </v-dialog>
  
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
      
        <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
        <v-icon
          small
          @click="deleteItemConfirm(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <span>
          Carregando... Por favor,aguarde!
        </span>
      </template>
      </v-data-table>
    </v-card>
    <div
        ref="modal"
        class="modal fade"
        :class="{show}"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Criação de Desenvolvedor</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="criarDesenvolvedor"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="cadastroDesenvolvedor">
              <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
              <select class="form-control" ref="Nivel">
                <option value="1" selected>Selecione um Nivel</option>
                <option v-for="NivelNome in NivelNome" :key="NivelNome.id" :value="NivelNome.id">{{ NivelNome.Nivel }}</option>
              </select>
              <div class="mb-3">
                <button type="submit" class="btn btn-primary pull-right">Cadastrar</button>
              </div>
              </form>
              </div>
          </div>
        </div>
      </div>
    </div>
    </v-app>
  </template>
  
  <script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  //import ActionButtonsUsers from "./Components/ActionButtonsUsers.vue"
  import axios from "axios"
  
    export default {
      name: 'Usuarios',
      data () {
        return {
          search: '',
          loadTable: true,
          id: this.id,
          nome: this.nome,
          nivel: this.nivel,
          criarNome: this.criarNome,
          criarNivel: this.criarNivel,
          
          dialog: false,
          dialogDelete: false,
          dialogRelatorio: false,
          editedIndex: -1,
          desenvolvedor: [],
          NivelNome: [],
          errors: [],
          show:false,
          headers: [
            {
              text: 'Id',
              align: 'start',
              value: 'Id',
            },
            { text: 'Nome', value: 'Nome' },
            { text: 'Nivel', value: 'Nivel' },
            
            { text: 'Ações', value: 'actions', sortable: false },
          ],
        }
      },
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  
      watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
        dialogRelatorio (val) {
          val || this.closeRelatorio()
        },
      },
      methods: {
          criarDesenvolvedor() {
              setTimeout(() => (this.show = !this.show), 10);
          },
          cadastroDesenvolvedor(){
                  this.criarDesenvolvedor()
                  axios.post("/desenvolvedor", ({
                    Nome: this.criarNome,
                    Nivel: this.$refs['Nivel'].value,
                    
                  }))
                      .then((res) => {
                          res.send("Cadastro com sucesso!")
                          this.criarDesenvolvedor()
                          this.dialog = false
                      })
                      .catch((error) => {
                          this.criarDesenvolvedor()
                          this.dialog = false
                      }).finally(() => {
                          this.criarDesenvolvedor()
                          this.dialog = false
                      });
              },
              async atualizarDesenvolvedor(){
                const id = this.id
                
          try{
          await axios.patch("/desenvolvedor/"+id, {
                  
                  "Nome": this.criarNome,
                  "Nivel": this.$refs['Nivel'].value,
                })
          alert("Desenvolvedor Atualizado!");
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
            },
           
  
        editItem (item) {
          this.editedIndex = this.desenvolvedor.indexOf(item)
          this.editedItem = Object.assign({}, item)
        this.id = item.Id
        this.nome = item.Nome
        this.nivel = item.Nivel
        
          this.dialog = true
        },
  
        
  
        deleteItem (item) {
          this.editedIndex = this.desenvolvedor.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm (item) {
          
          const id = item.Id
          axios.delete("/desenvolvedor/"+id)
                          .then((res) => {
                            alert("Desenvolvedor Removido!");
                          })
                          .catch((error) => {
                            alert("Erro!");
                          }).finally(() => {
                          });
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeRelatorio () {
          this.dialogRelatorio = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.desenvolvedor[this.editedIndex], this.editedItem)
          } else {
            this.desenvolvedor.push(this.editedItem)
          }
          this.close()
        },
  
  },
      created: function(){
        this.$http.get('/nivel')
        .then(response => {
              this.NivelNome = response.data;
                   })
                     axios.get("/desenvolvedor")
                          .then(response => {
                            this.desenvolvedor = response.data;
                          })
                          .catch(error => {
                            this.desenvolvedor = error.data;
                          });
                    this.loadTable= false;
              },
    }
  </script>
  