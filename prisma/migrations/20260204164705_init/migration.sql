-- CreateTable
CREATE TABLE "Brand" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "country_of_origin" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" UUID NOT NULL,
    "brand_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "body_type" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trim" (
    "id" UUID NOT NULL,
    "model_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "base_price_cny" DECIMAL(65,30) NOT NULL,
    "base_price_rub" DECIMAL(65,30) NOT NULL,
    "specifications" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" UUID NOT NULL,
    "trim_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "hex_code" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL,
    "additional_price_cny" DECIMAL(65,30),
    "additional_price_rub" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wheel" (
    "id" UUID NOT NULL,
    "trim_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "additional_price_cny" DECIMAL(65,30),
    "additional_price_rub" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wheel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interior" (
    "id" UUID NOT NULL,
    "trim_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "additional_price_cny" DECIMAL(65,30),
    "additional_price_rub" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdditionalOption" (
    "id" UUID NOT NULL,
    "trim_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_paid" BOOLEAN NOT NULL,
    "price_cny" DECIMAL(65,30),
    "price_rub" DECIMAL(65,30),
    "category" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdditionalOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" UUID NOT NULL,
    "trim_id" UUID NOT NULL,
    "color_id" UUID NOT NULL,
    "wheels_id" UUID,
    "interior_id" UUID,
    "selected_options" JSONB NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "total_price_cny" DECIMAL(65,30) NOT NULL,
    "total_price_rub" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "configuration_snapshot" JSONB NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CurrencyRate" (
    "id" UUID NOT NULL,
    "rate_cny_to_rub" DECIMAL(65,30) NOT NULL,
    "source" TEXT NOT NULL,
    "is_manual_override" BOOLEAN NOT NULL,
    "valid_from" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Model_brand_id_idx" ON "Model"("brand_id");

-- CreateIndex
CREATE INDEX "Trim_model_id_idx" ON "Trim"("model_id");

-- CreateIndex
CREATE INDEX "Color_trim_id_idx" ON "Color"("trim_id");

-- CreateIndex
CREATE INDEX "Wheel_trim_id_idx" ON "Wheel"("trim_id");

-- CreateIndex
CREATE INDEX "Interior_trim_id_idx" ON "Interior"("trim_id");

-- CreateIndex
CREATE INDEX "AdditionalOption_trim_id_idx" ON "AdditionalOption"("trim_id");

-- CreateIndex
CREATE INDEX "Inquiry_trim_id_idx" ON "Inquiry"("trim_id");

-- CreateIndex
CREATE INDEX "Inquiry_color_id_idx" ON "Inquiry"("color_id");

-- CreateIndex
CREATE INDEX "Inquiry_wheels_id_idx" ON "Inquiry"("wheels_id");

-- CreateIndex
CREATE INDEX "Inquiry_interior_id_idx" ON "Inquiry"("interior_id");

-- CreateIndex
CREATE INDEX "Inquiry_status_idx" ON "Inquiry"("status");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trim" ADD CONSTRAINT "Trim_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "Trim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wheel" ADD CONSTRAINT "Wheel_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "Trim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interior" ADD CONSTRAINT "Interior_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "Trim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalOption" ADD CONSTRAINT "AdditionalOption_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "Trim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "Trim"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_wheels_id_fkey" FOREIGN KEY ("wheels_id") REFERENCES "Wheel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inquiry" ADD CONSTRAINT "Inquiry_interior_id_fkey" FOREIGN KEY ("interior_id") REFERENCES "Interior"("id") ON DELETE SET NULL ON UPDATE CASCADE;
