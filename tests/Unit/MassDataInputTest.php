<?php

namespace Tests\Unit;

use Tests\TestCase;

class MassDataInputTest extends TestCase
{
    /**
     * Test that all models under app/Models have $guarded = [] or unguard enabled for mass data input.
     */
    public function test_all_models_allow_mass_data_input(): void
    {
        $modelsPath = app_path('Models');
        $files = glob($modelsPath . '/*.php');

        $this->assertNotEmpty($files, 'No models found in app/Models');

        foreach ($files as $file) {
            $className = 'App\\Models\\' . pathinfo($file, PATHINFO_FILENAME);
            
            $this->assertTrue(class_exists($className), "Class {$className} does not exist.");

            $model = new $className();
            
            // Verify model is eloquent model
            $this->assertInstanceOf(\Illuminate\Database\Eloquent\Model::class, $model);
            
            // Check that fillable is empty and guarded is empty, or guarded is empty so mass assignment is allowed
            $guarded = $model->getGuarded();
            $fillable = $model->getFillable();

            $isUnguarded = empty($guarded) && empty($fillable);
            $this->assertTrue(
                $isUnguarded,
                "Model {$className} has restrictions on mass data input. Guarded: " . json_encode($guarded) . ", Fillable: " . json_encode($fillable)
            );
        }
    }
}
