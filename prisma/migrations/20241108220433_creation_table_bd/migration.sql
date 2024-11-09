BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Collecte] (
    [id] INT NOT NULL IDENTITY(1,1),
    [typePersonne] NVARCHAR(1000),
    [nom] NVARCHAR(1000),
    [prenom] NVARCHAR(1000),
    [lieuResidence] NVARCHAR(1000),
    [eglise] NVARCHAR(1000),
    [profession] NVARCHAR(1000),
    [raisonSociale] NVARCHAR(1000),
    [personneReference] NVARCHAR(1000),
    [fonction] NVARCHAR(1000),
    [adresseMail] NVARCHAR(1000),
    [telephone] NVARCHAR(1000),
    [typeMembre] NVARCHAR(1000),
    [optionMembreDonateur] NVARCHAR(1000),
    [typePaiement] NVARCHAR(1000),
    [datePaiement] DATETIME2,
    [modePaiement] NVARCHAR(1000),
    [referencePaiement] NVARCHAR(1000),
    [referenceVerolive] NVARCHAR(1000),
    [statusPaiement] NVARCHAR(1000),
    [montantEngagement] FLOAT(53),
    [montantPayer] FLOAT(53),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Collecte_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Collecte_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Adhesion] (
    [id] INT NOT NULL IDENTITY(1,1),
    [typePersonne] NVARCHAR(1000),
    [nom] NVARCHAR(1000),
    [prenom] NVARCHAR(1000),
    [lieuResidence] NVARCHAR(1000),
    [eglise] NVARCHAR(1000),
    [profession] NVARCHAR(1000),
    [raisonSociale] NVARCHAR(1000),
    [personneReference] NVARCHAR(1000),
    [fonction] NVARCHAR(1000),
    [adresseMail] NVARCHAR(1000),
    [telephone] NVARCHAR(1000),
    [typeMembre] NVARCHAR(1000),
    [optionMembreDonateur] NVARCHAR(1000),
    [typePaiement] NVARCHAR(1000),
    [datePaiement] DATETIME2,
    [modePaiement] NVARCHAR(1000),
    [referencePaiement] NVARCHAR(1000),
    [referenceVerolive] NVARCHAR(1000),
    [statusPaiement] NVARCHAR(1000),
    [montantEngagement] FLOAT(53),
    [montantPayer] FLOAT(53),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Adhesion_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Adhesion_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
