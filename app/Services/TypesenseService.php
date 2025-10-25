<?php
namespace App\Services;

use Typesense\Client;

class TypesenseService
{
    protected Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'api_key' => env('TYPESENSE_API_KEY'),
            'nodes' => [
                [
                    'host' => 'localhost',
                    'port' => '8108',
                    'protocol' => 'http',
                ],
            ],
            'connection_timeout_seconds' => 2,
        ]);
    }

    public function createCollection()
    {
        $schema = [
            'name' => 'books',
            'fields' => [
                ['name' => 'id', 'type' => 'string'],
                ['name' => 'title', 'type' => 'string'],
                ['name' => 'author', 'type' => 'string'],
                ['name' => 'year', 'type' => 'int32'],
            ],
            'default_sorting_field' => 'year',
        ];

        try {
            return $this->client->collections->create($schema);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function addDocument(array $document)
    {
        return $this->client->collections['books']->documents->create($document);
    }

    public function search(string $query)
    {
        return $this->client->collections['books']->documents->search([
            'q' => $query,
            'query_by' => 'title,author',
        ]);
    }
}
