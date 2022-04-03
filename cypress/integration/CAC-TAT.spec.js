/// <reference types="Cypress" />

describe ('Central de atendimento ao cliente CAC', function () {
    it('Verifica o título da aplicação', function () {
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#email').type('test-test.com')
        //cy.get('.button').click()
        cy.contains('Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Verifica se telefone não permite caracteres', () => {
        cy.get('#phone').type('abcdefg')
        cy.get('#phone').should('be.empty')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.get('#phone').type('53999999999')
        cy.get('.button').click()
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#email').should('have.value', 'test-test.com')
        cy.get('#email').clear()
        cy.get('#email').should('have.value', '')
        cy.get('#email').type('test@test.com')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.visit('./src/index.html')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        cy.get('#firstName').type('Marcos')
        cy.get('#lastName').type('Macedo')
        cy.get('#email').type('test@test.com')
        cy.get('#open-text-area').type('abcdefghijklmnopqrstuvwxyz')
        cy.get('.button').click()
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.visit('./src/index.html')
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
})