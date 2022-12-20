<template>
  <v-app>
    <v-card>
      <v-card-title>
        Nivel
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                @click="criarNivel"
              >
              Criar Nivel
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
        :items="getNivel"
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
              <h5 class="modal-title">Edição de Nivel</h5>
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
              <form v-on:submit.prevent="atualizarNivel">
                <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
              
              
              
              
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
              <h5 class="modal-title">Criação de Nivel</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="criarNivel"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="cadastroNivel">
              <div class="mb-3">
                <label for="formName" class="form-label">Nome</label>
                <input class="form-control" type="text" v-model="criarNome" id="nome">
              </div>
      
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
  import axios from "axios"
  
    export default {
      name: 'Nivel',
      data () {
        return {
          search: '',
          loadTable: true,
          id: this.id,
          nivel: this.Nivel,
          criarNome: this.criarNome,
          dialog: false,
          dialogDelete: false,
          dialogRelatorio: false,
          editedIndex: -1,
          getNivel: [],
          errors: [],
          show:false,
          headers: [
            {
              text: 'Id',
              align: 'start',
              value: 'id',
            },
            
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
          criarNivel() {
              setTimeout(() => (this.show = !this.show), 10);
          },
          cadastroNivel(){
                  this.criarNivel()
                  axios.post("/nivel", ({
                    
                    Nivel: this.criarNome,
                    
                  }))
                      .then((res) => {
                          res.send("Cadastro com sucesso!")
                          this.criarNivel()
                          this.dialog = false
                      })
                      .catch((error) => {
                          this.criarNivel()
                          this.dialog = false
                      }).finally(() => {
                          this.criarNivel()
                          this.dialog = false
                      });
              },
              async atualizarNivel(){
                const id = this.id
                
          try{
          await axios.patch("/nivel/"+id, {
                  
                  "Nivel": this.criarNome,
                  
                })
          alert("Nivel Atualizado!");
          } catch (error) {
                
                alert("Erro!");
          }
          this.dialog = false
            },
           
  
        editItem (item) {
          this.editedIndex = this.getNivel.indexOf(item)
          this.editedItem = Object.assign({}, item)
        this.id = item.id
        this.nivel = item.Nivel
        
          this.dialog = true
        },
  
        
  
        deleteItem (item) {
          this.editedIndex = this.getNivel.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm (item) {
          
          const id = item.id
          axios.delete("/nivel/"+id)
                          .then((res) => {
                            alert("Nivel Removido!");
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
            Object.assign(this.getNivel[this.editedIndex], this.editedItem)
          } else {
            this.getNivel.push(this.editedItem)
          }
          this.close()
        },
  
  },
      created: function(){
        
                     axios.get("/nivel")
                          .then(response => {
                            this.getNivel = response.data;
                          })
                          .catch(error => {
                            this.getNivel = error.data;
                          });
                    this.loadTable= false;
              },
    }
  </script>
  