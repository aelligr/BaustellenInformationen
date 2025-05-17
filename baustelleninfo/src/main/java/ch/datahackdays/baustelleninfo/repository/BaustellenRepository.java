package ch.datahackdays.baustelleninfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.datahackdays.baustelleninfo.model.Baustelle;

public interface BaustellenRepository extends JpaRepository<Baustelle, Long> {
}