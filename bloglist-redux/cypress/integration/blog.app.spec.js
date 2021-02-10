const { isExportDeclaration } = require("typescript")

describe('Blog app', function() {
  beforeEach(function (){
     cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
      const ahmo = {
      name: 'ahmedo ',
      username: 'ahmedo',
      password: '1234567'
    }
    const reemo = {
      name: 'reem',
      username: 'reemo',
      password: '22222'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', reemo) 
    cy.request('POST', 'http://localhost:3001/api/users/', ahmo) 
    

    cy.visit('http://localhost:3000')

  })

  it('Login form is shown', function() {
    cy.contains('Log in to the application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      //cy.contains('login').click()
      cy.get('#username').type('ahmedo')
      cy.get('#password').type('1234567')
      cy.get('#login-button').click()
    
      cy.contains('ahmedo logged-in')
    })

    it('fails with wrong credentials', function() {
        //cy.contains('login').click()
        cy.get('#username').type('ahmedo')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click() 
    
        cy.get('.error').should('contain','Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
       cy.get('html').should('not.contain', 'AHMEDO logged-in')
    })
  })

  describe.only('When loggedin ', function (){
    beforeEach(function() {
        cy.login({username: 'ahmedo', password:'1234567'})
      
        cy.createBlog({title:'a blog created by cypress', author:'ahmed', url:'www.ahmed.com'})

    })

    it('A blog can be created', function() {
      
      cy.createBlog({title:'a blog created by cypress', author:'ahmed', url:'www.ahmed.com'})
      cy.contains('a blog created by cypress by ahmed') 
    })
    it('a logged in user can like a blog ', function() {
      cy.login({username: 'reemo', password:'22222'})
      cy.createBlog({title:'a blog created by cypress', author:'reem', url:'www.reem.com'})

      
      cy.contains('a blog created by cypress by ahmed').find('button').as('theButton')
      cy.get('@theButton').contains('view').click()
      cy.get('@theButton').contains('like').click()
      cy.get('@theButton').should('contain', 'unlike')
      
      cy.should('contain','unlike')
      cy.contains('1')
      
    })
    it('A blog can be deleted by the owner', function() {

      cy.createBlog({title:'a blog created by cypress', author:'ahmed', url:'www.ahmed.com'})

      
      cy.contains('view').click({multiple:true})
      
      cy.contains('remove').click()
       cy.on('window:confirm', () => true)
      cy.get('.error').should('contain','Blog deleted successfully')
       .and('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.css', 'border-style', 'solid')
    })

    it('A blog can not be deleted by other than own user', function() {
      cy.login({username: 'reemo', password:'22222'})
      cy.createBlog({title:'a blog created by cypress', author:'reem', url:'www.reem.com'})

      
      cy.contains('a blog created by cypress by ahmed').find('button').as('theButton')
      cy.get('@theButton').contains('view').click()
      cy.get('@theButton').contains('remove').should('have.css','display','none')
      
    })

    it('blogs are sorted by thier likes decending order ', function() {
      cy.login({username: 'reemo', password:'22222'})
      cy.createBlog({title:'a blog created by cypress', author:'reem', url:'www.reem.com'})

      //click all 'view' bottons to display the details
      cy.get('.display').click({multiple:true})

      cy.get('.likesCount').should(likes => {
        expect(likes[0]).to.contain.text('0')
        expect(likes[1]).to.contain.text('0')
      
      })
       // like the second blog , increase like by one 
      cy.get('.likes').eq(1).click()

      // before any click 
    
      cy.get('.likesCount').should(likes => {
        expect(likes[0]).to.contain.text('1')
        expect(likes[1]).to.contain.text('0')
        
      })
      
      
    })

    


  })

  
  

  
})