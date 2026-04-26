<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

/**
 * Abstract class — Base Repository
 * Chứa logic CRUD chung, các Repository cụ thể kế thừa và override
 * Áp dụng: abstract class requirement trong đề bài
 */
abstract class AbstractRepository
{
    /**
     * Các class con phải khai báo Model tương ứng
     */
    abstract protected function getModel(): string;

    /**
     * Trả về instance Model mới
     */
    protected function model(): Model
    {
        return app($this->getModel());
    }

    public function findById(int $id): mixed
    {
        // TODO: return $this->model()->find($id);
    }

    public function findAll(): array
    {
        // TODO: return $this->model()->all()->toArray();
    }

    public function create(array $data): mixed
    {
        // TODO: return $this->model()->create($data);
    }

    public function update(int $id, array $data): bool
    {
        // TODO: return (bool) $this->model()->where('id', $id)->update($data);
    }

    public function delete(int $id): bool
    {
        // TODO: return (bool) $this->model()->destroy($id);
    }

    /**
     * Tìm theo điều kiện tùy ý
     */
    public function findWhere(array $conditions): array
    {
        // TODO: return $this->model()->where($conditions)->get()->toArray();
    }

    /**
     * Phân trang kết quả
     */
    public function paginate(int $perPage = 15): array
    {
        // TODO: return $this->model()->paginate($perPage)->toArray();
    }
}
