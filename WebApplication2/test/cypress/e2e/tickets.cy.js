/// <reference types="cypress" />

/**
 * Testes end-to-end para as rotas de Ticket (`TicketsController`).
 *
 * Pré-requisitos:
 * - A API deve estar em execução localmente.
 * - Ajuste a URL da API via variável de ambiente CYPRESS_apiUrl ou alterando o valor padrão abaixo.
 */

const getApiUrl = () => {
  return Cypress.env("apiUrl") || "http://localhost:5000";
};

describe("API Tickets - TicketsController", () => {
  const baseApi = () => `${getApiUrl()}/api/Tickets`;

  it("deve criar, buscar, atualizar e deletar um ticket com sucesso", () => {
    const createPayload = {
      brand: "Fiat",
      model: "Uno",
      violationLocation: "Rua A",
      reference: "Próximo ao número 123",
      dateTime: "2025-11-25T10:30:00",
      state: "SP",
      city: "São Paulo",
      description: "Estacionado em local proibido",
      color: "Branco",
      type: "media"
    };

    // 1) Cria um novo ticket
    cy.request("POST", baseApi(), createPayload).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body).to.have.property("id");

      const createdId = createResponse.body.id;

      // 2) Busca o ticket criado por ID
      cy.request("GET", `${baseApi()}/${createdId}`).then((getByIdResponse) => {
        expect(getByIdResponse.status).to.eq(200);
        expect(getByIdResponse.body).to.include({
          brand: createPayload.brand,
          model: createPayload.model,
          violationLocation: createPayload.violationLocation,
          reference: createPayload.reference,
          state: createPayload.state,
          city: createPayload.city,
          description: createPayload.description,
          color: createPayload.color
        });
        // DateTime no backend é DateTime?, então apenas verificamos se veio algo
        expect(getByIdResponse.body).to.have.property("dateTime");

        // 3) Atualiza o ticket
        const updatePayload = {
          ...createPayload,
          description: "Descrição atualizada pelo teste E2E"
        };

        cy.request("PUT", `${baseApi()}/${createdId}`, updatePayload).then(
          (updateResponse) => {
            expect(updateResponse.status).to.eq(200);
            expect(updateResponse.body).to.have.property(
              "description",
              updatePayload.description
            );
          }
        );

        // 4) Busca todos os tickets e verifica se o ID criado está presente
        cy.request("GET", baseApi()).then((getAllResponse) => {
          expect(getAllResponse.status).to.eq(200);
          expect(getAllResponse.body).to.be.an("array");
          const hasCreated = getAllResponse.body.some(
            (t) => t.id === createdId
          );
          expect(hasCreated).to.be.true;
        });

        // 5) Deleta o ticket
        cy.request("DELETE", `${baseApi()}/${createdId}`).then(
          (deleteResponse) => {
            expect(deleteResponse.status).to.eq(204);
          }
        );

        // 6) Garante que o ticket não existe mais (404)
        cy.request({
          method: "GET",
          url: `${baseApi()}/${createdId}`,
          failOnStatusCode: false
        }).then((getDeletedResponse) => {
          expect(getDeletedResponse.status).to.eq(404);
        });
      });
    });
  });

  it("deve retornar 400 quando o formato de data for inválido", () => {
    const invalidDatePayload = {
      brand: "Ford",
      model: "Ka",
      violationLocation: "Rua B",
      reference: "Esquina",
      dateTime: "data-invalida-123",
      state: "RJ",
      city: "Rio de Janeiro",
      description: "Multa de teste com data inválida",
      color: "Preto",
      type: "grave"
    };

    cy.request({
      method: "POST",
      url: baseApi(),
      failOnStatusCode: false,
      body: invalidDatePayload
    }).then((response) => {
      expect(response.status).to.eq(400);
      // O ModelState retorna um JSON com erros de validação.
      // Dependendo de como o ASP.NET está configurado, a mensagem pode variar.
      // Aqui apenas verificamos que o campo DateTime tem algum erro.
      const errors = response.body?.errors || response.body;
      if (errors) {
        const dateErrors =
          errors.DateTime || errors["request.DateTime"] || errors.dateTime;
        if (dateErrors) {
          expect(dateErrors.join(" ")).to.contain("Invalid date format");
        }
      }
    });
  });
});


